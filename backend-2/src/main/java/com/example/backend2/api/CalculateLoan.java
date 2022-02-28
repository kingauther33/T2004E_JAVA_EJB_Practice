package com.example.backend2.api;
import com.example.backend2.entity.Loan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1")
public class CalculateLoan {
    @RequestMapping(path = "calculateInterest", method = RequestMethod.GET)
    public ResponseEntity<Object> calculateRateOfInterest(@RequestBody Loan loan) {
        double loanAmount =  loan.getLoanAmount();
        double rateOfInterest =  loan.getRate() / 100;
        double tenure =  loan.getTenure();

        double mathPow = Math.pow((1 + rateOfInterest), tenure);

        double totalLoanAmount = loanAmount * rateOfInterest
                * (mathPow / (mathPow - 1))
                * 1/12;

        return new ResponseEntity<>(totalLoanAmount, HttpStatus.OK);
    }

    @RequestMapping(path = "calculateTotalLoanToBePaid", method = RequestMethod.GET)
    public ResponseEntity<Object> calculateTotalLoanToBePaidBeforeEndOfTenure(double remainingLoan, int rateOfEarlySettleMent) {
        double totalLoanAmount = remainingLoan * rateOfEarlySettleMent;

        return new ResponseEntity<>(totalLoanAmount, HttpStatus.OK);
    }
}
