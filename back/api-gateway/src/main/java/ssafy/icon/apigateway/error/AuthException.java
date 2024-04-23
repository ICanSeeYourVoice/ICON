package ssafy.icon.apigateway.error;

public class AuthException extends RuntimeException {
	public AuthException(String message) {
		super(message);
	}
}