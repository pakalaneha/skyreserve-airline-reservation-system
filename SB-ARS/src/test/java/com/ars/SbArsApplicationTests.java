package com.ars;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ars.entity.User;
import com.ars.message.ApplicationMessages;

import jakarta.validation.Validator;

@SpringBootTest
class SbArsApplicationTests {

	@Autowired
	private ApplicationMessages messages;

	@Autowired
	private Validator validator;

	@Test
	void contextLoads() {
	}

	@Test
	void resolvesMessagesFromApplicationProperties() {
		assertEquals("Insufficient wallet balance. Available: 42.5",
				messages.get("app.message.wallet.insufficient-balance", 42.5));
	}

	@Test
	void resolvesValidationMessagesFromValidationBundle() {
		assertTrue(validator.validate(new User()).stream()
				.anyMatch(violation -> violation.getPropertyPath().toString().equals("firstName")
						&& violation.getMessage().equals("First Name is required")));
	}
}
