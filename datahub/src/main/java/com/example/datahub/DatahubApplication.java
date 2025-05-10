package com.example.datahub;

import com.example.datahub.dao.entity.Donation;
import com.example.datahub.dao.repository.DonationRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class DatahubApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(DatahubApplication.class, args);

		// Temporary test code
		//testDonationRepository(context);
	}

	private static void testDonationRepository(ConfigurableApplicationContext context) {
		DonationRepository donationRepo = context.getBean(DonationRepository.class);

		// Create test donation WITH project_id
		Donation donation = new Donation();
		donation.setAmount(new BigDecimal("50.00"));
		donation.setDonorName("Test User");
		donation.setProjectId("test-project");  // THIS WAS MISSING

		// Save and print
		Donation saved = donationRepo.save(donation);
		System.out.println("Saved donation with ID: " + saved.getId());

		// Find by project - NOW WILL WORK
		List<Donation> donations = donationRepo.findByProjectId("test-project");
		System.out.println("Found donations: " + donations.size());
	}
}
