package ssafy.icon.apigateway.auth.filter;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import ssafy.icon.apigateway.auth.filter.AuthorizationHeaderFilter.Config;
import ssafy.icon.apigateway.auth.jwt.JwtUtils;
import ssafy.icon.apigateway.error.AuthException;

@Slf4j
@Component
public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<Config> {

	@Value("${jwt.access-key}")
	private String jwtKey;

	@Autowired
	private JwtUtils jwtUtils;

	public AuthorizationHeaderFilter() {
		super(Config.class);
	}

	@Override
	public GatewayFilter apply(Config config) {
		return (exchange, chain) -> {
			try {
				String token = exchange.getRequest().getHeaders().get(AUTHORIZATION).get(0).substring(7);

				String userId = jwtUtils.parseId(token);

				addAuthorizationHeaders(exchange.getRequest(), userId);
			} catch (ExpiredJwtException ex) {
				throw new AuthException("토큰이 만료되었습니다.");
			} catch (MalformedJwtException | SignatureException | IllegalArgumentException |
					 NullPointerException ex) {
				throw new AuthException("인증에 실패하였습니다.");
			}

			return chain.filter(exchange);
		};
	}

	private void addAuthorizationHeaders(ServerHttpRequest request, String userId) {
		request.mutate()
			.header("X-Authorization-Id", userId)
			.build();
	}

	static class Config {

	}
}