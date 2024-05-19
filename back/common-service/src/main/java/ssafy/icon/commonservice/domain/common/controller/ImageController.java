package ssafy.icon.commonservice.domain.common.controller;

import java.io.IOException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ssafy.icon.commonservice.domain.common.dto.ImageUploadResponse;
import ssafy.icon.commonservice.global.bucket.BucketClient;
import ssafy.icon.commonservice.global.error.exception.CommonException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ImageController {

	private final BucketClient bucketClient;

	@PostMapping(path = "/images")
	public ResponseEntity<ImageUploadResponse> uploadImage(
		@RequestParam("image") MultipartFile image) throws IOException {
		if (!Objects.equals(image.getContentType(), MediaType.IMAGE_JPEG_VALUE) &&
			!Objects.equals(image.getContentType(), MediaType.IMAGE_PNG_VALUE))
		{
			throw new CommonException(HttpStatus.BAD_REQUEST, "이미지 외에는 업로드할 수 없습니다.");
		}

		return ResponseEntity.ok(new ImageUploadResponse(bucketClient.uploadImage(image)));
	}

}


