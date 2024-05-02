package ssafy.icon.commonservice.domain.member.service;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Date;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import ssafy.icon.commonservice.domain.member.dto.PostTTSReq;
import ssafy.icon.commonservice.domain.member.dto.SignUpForm;
import ssafy.icon.commonservice.domain.member.entity.Guardian;
import ssafy.icon.commonservice.domain.member.entity.Member;
import ssafy.icon.commonservice.domain.member.repository.GuardianRepository;
import ssafy.icon.commonservice.domain.member.repository.MemberRepository;
import ssafy.icon.commonservice.domain.smartthings.dto.GetMemberDto;
import ssafy.icon.commonservice.global.error.exception.MemberException;

@RequiredArgsConstructor
@Slf4j
@Service
public class MemberService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final GuardianRepository guardianRepository;

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
	public File postTTS(String apiKeyId, String apiKey, PostTTSReq request) {
		try {
			String text = URLEncoder.encode(request.getText(), "UTF-8");
			String apiURL = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
			URL url = new URL(apiURL);
			HttpURLConnection con = (HttpURLConnection)url.openConnection();

			con.setRequestMethod("POST");
			con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", apiKeyId);
			con.setRequestProperty("X-NCP-APIGW-API-KEY", apiKey);
			// post request
			String postParams = "speaker=nara&volume=0&speed=0&pitch=0&format=mp3&text=" + text;
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
				// 랜덤한 이름으로 mp3 파일 생성
				String tempname = Long.valueOf(new Date().getTime()).toString();
				File f = new File(tempname + ".mp3");
				f.createNewFile();
				OutputStream outputStream = new FileOutputStream(f);
				while ((read = is.read(bytes)) != -1) {
					outputStream.write(bytes, 0, read);
				}
				is.close();
				return f;
			} else {  // 오류 발생
				br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
				String inputLine;
				StringBuffer response = new StringBuffer();
				while ((inputLine = br.readLine()) != null) {
					response.append(inputLine);
				}
				br.close();
				log.info("post TTS error : {}", response.toString());
			}
		} catch (Exception e) {
			log.error(String.valueOf(e));
		}
		return null;
	}

	public void addGuardian(Integer memberId, String uid) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 회원 ID입니다."));
		log.info("member : {}", member);

		// 예외처리
		memberRepository.findByUid(uid)
			.orElseThrow(() -> new MemberException(BAD_REQUEST, "존재하지 않은 보호자 회원 UID입니다."));
		if (guardianRepository.findByUidAndMemberId(uid, memberId).isPresent()) {
			throw new MemberException(BAD_REQUEST, "등록된 보호자입니다.");
		}

		Guardian guardian = Guardian.builder()
			.uid(uid)
			.member(member)
			.build();
		guardianRepository.save(guardian);
	}
}
