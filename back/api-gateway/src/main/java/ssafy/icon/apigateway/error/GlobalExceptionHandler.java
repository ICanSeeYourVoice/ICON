package ssafy.icon.apigateway.error;

import static org.springframework.http.MediaType.APPLICATION_JSON;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.ErrorResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Order(-2)
@Component
class GlobalExceptionHandler implements ErrorWebExceptionHandler {

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
		ErrorResponse errorResponse = null;
		DataBuffer dataBuffer = null;

		DataBufferFactory bufferFactory = exchange.getResponse().bufferFactory();

		exchange.getResponse().getHeaders().setContentType(APPLICATION_JSON);


		if (ex instanceof AuthException) {
			errorResponse = ErrorResponse.create(ex, HttpStatus.UNAUTHORIZED,
				ex.getMessage());
		} else {
			errorResponse = ErrorResponse.create(ex, HttpStatus.INTERNAL_SERVER_ERROR,
				ex.getMessage());
		}

		try {
			dataBuffer =
				bufferFactory.wrap(objectMapper.writeValueAsBytes(errorResponse.getBody()));
		} catch (JsonProcessingException e) {
			bufferFactory.wrap("".getBytes());
		}

		exchange.getResponse().setStatusCode(errorResponse.getStatusCode());

		return exchange.getResponse().writeWith(Mono.just(dataBuffer));
	}
}
