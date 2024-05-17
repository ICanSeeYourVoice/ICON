package ssafy.icon.commonservice.domain.member.service;

import static org.springframework.http.HttpStatus.*;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.member.dto.AddGuardianReq;
import ssafy.icon.commonservice.domain.member.dto.AddTokenReq;
import ssafy.icon.commonservice.domain.member.dto.GetGuardiansDto;
import ssafy.icon.commonservice.domain.member.dto.GetGuardiansWithTokenDto;
import ssafy.icon.commonservice.domain.member.dto.PostTTSReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.entity.Guardian;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.GuardianRepository;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.domain.smartthings.dto.GetMemberDto;
import ssafy.icon.commonservice.global.config.NaverTTSConfig;
import ssafy.icon.commonservice.global.error.exception.MemberException;

@RequiredArgsConstructor
@Slf4j
@Service
public class MemberService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final GuardianRepository guardianRepository;

	@Autowired
	private NaverTTSConfig naverTTSConfig;

	public void addMember(SignUpForm form) {
		// 회원 아이디가 이미 있는지
		if (memberRepository.findByUid(form.uid()).isPresent()) {
			throw new MemberException(BAD_REQUEST, "사용중인 ID 입니다.");
		}

		memberRepository.save(Member.builder()
			.uid(form.uid())
			.pw(passwordEncoder.encode(form.pw()))
			.name(form.name())
			.build());
	}

	public GetMemberDto getMember(Integer memberId) {
		log.info("test : {}", memberId);
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		GetMemberDto memberDto = GetMemberDto.builder()
			.id(member.getId())
			.uid(member.getUid())
			.name(member.getName())
			.webToken(member.getWebToken())
			.appToken(member.getAppToken())
			.build();

		log.info("memberdto : {}", memberDto.toString());

		return memberDto;
	}

	// public void  postTTS() {
	public byte[] postTTS(PostTTSReq request) {
		try {
			String text = URLEncoder.encode(request.getText(), "UTF-8");
			String speaker = URLEncoder.encode(request.getSpeaker(), "UTF-8");
			URL url = new URL("https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts");
			HttpURLConnection con = (HttpURLConnection)url.openConnection();

			con.setRequestMethod("POST");
			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", naverTTSConfig.getApiKeyId());
			con.setRequestProperty("X-NCP-APIGW-API-KEY", naverTTSConfig.getApiKey());
			// post request
			String postParams = "speaker=" + speaker + "&volume=5&speed=0&pitch=0&format=mp3&text=" + text;
			con.setDoOutput(true);
			DataOutputStream wr = new DataOutputStream(con.getOutputStream());
			wr.writeBytes(postParams);
			wr.flush();
			wr.close();

			int responseCode = con.getResponseCode();
			BufferedReader br;
			if (responseCode == 200) { // 정상 호출
				log.info("service postTTS con 200");
				InputStream is = con.getInputStream();
				int read = 0;
				byte[] bytes = new byte[1024];

				ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
				while ((read = is.read(bytes)) != -1) {
					outputStream.write(bytes, 0, read);
				}
				is.close();
				return outputStream.toByteArray();
			} else {  // 오류 발생
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
				String inputLine;
				StringBuffer response = new StringBuffer();
				while ((inputLine = br.readLine()) != null) {
					response.append(inputLine);
				}
				br.close();
				log.info("post TTS error : {}", response.toString());
				throw new MemberException(SERVICE_UNAVAILABLE, "TTS 요청이 실패했습니다.");
			}
		} catch (Exception e) {
			log.error(String.valueOf(e));
			throw new MemberException(SERVICE_UNAVAILABLE, "TTS 요청이 실패했습니다.");
		}
	}

	public void addGuardian(Integer memberId, AddGuardianReq req) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		// 예외처리
		memberRepository.findById(req.getId())
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 보호자 회원 ID입니다."));
		if (guardianRepository.findByGuestIdAndHostId(req.getId(), memberId).isPresent()) {
			throw new MemberException(BAD_REQUEST, "등록된 보호자입니다.");
		}

		Guardian guardian = Guardian.builder()
			.guestId(req.getId())
			.hostId(memberId)
			.build();
		guardianRepository.save(guardian);
	}

	public void deleteGuardian(Integer memberId, Integer guardianId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		Guardian guardian = guardianRepository.findByIdAndHostId(guardianId, memberId).orElseThrow(
			() -> new MemberException(BAD_REQUEST, "존재하지 않은 보호자입니다."));
		log.info("guardian : {}", guardian);

		guardianRepository.delete(guardian);
	}

	public List<GetGuardiansDto> getGuardian(Integer memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		List<GetGuardiansDto> gDtoList = guardianRepository.findGuardiansWithMemberName(memberId);

		return gDtoList;
	}

	public List<GetGuardiansWithTokenDto> getGuardianWithToken(Integer memberId) {

		List<GetGuardiansWithTokenDto> gDtoList = guardianRepository.findGuardiansWithMemberToken(memberId);
		for (GetGuardiansWithTokenDto dto : gDtoList) {
			log.info("guardian token : {}", dto.toString() );
		}
		return gDtoList;
	}

	public void addToken(Integer memberId, AddTokenReq token) {
		// token의 id로 유저 정보 가져오기
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));

		log.info("guardian token : {}, {}", token.getToken(), token.getIsApp() );
		// new token 저장
		member.updateToken(token.getToken(), token.getIsApp());
		memberRepository.save(member);
	}

	public String getAppToken(Integer memberId) {	// token의 id로 유저 정보 가져오기
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));

		log.info("member app token : {}", member.getAppToken());
		// app token 조회
		if(member.getAppToken() == null){
			return "null";
		}
		return member.getAppToken();
	}
}
