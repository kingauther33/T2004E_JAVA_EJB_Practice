package com.example.backend.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class CalculateFormula {

    @RequestMapping("calculateInterest")
    public ResponseEntity<Object> calculateRateOfInterest(double loan, int tenure, double rateOfInterest) {
        double totalLoanAmount = 1 * rateOfInterest
                * (Math.pow((1 + rateOfInterest), tenure) / Math.pow((1 + rateOfInterest), tenure - 1))
                * 1/12;

        return new ResponseEntity<>(totalLoanAmount, HttpStatus.CREATED);
    }

    @RequestMapping("calculateTotalLoanToBePaid")
    public ResponseEntity<Object> calculateTotalLoanToBePaidBeforeEndOfTenure(double remainingLoan, int rateOfEarlySettleMent) {
        double totalLoanAmount = remainingLoan * rateOfEarlySettleMent;

        return new ResponseEntity<>(totalLoanAmount, HttpStatus.CREATED);
    }
}
