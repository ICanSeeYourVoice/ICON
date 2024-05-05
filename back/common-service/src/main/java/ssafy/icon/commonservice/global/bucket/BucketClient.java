package ssafy.icon.commonservice.global.bucket;

import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface BucketClient {

	String createPreAuthenticatedURL();

	String uploadImage(MultipartFile file) throws IOException;
}
