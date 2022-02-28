package com.example.backend2.api;
import com.example.backend2.entity.Loan;
import com.example.backend2.entity.LoanBeforeEndOfTenure;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1")
public class CalculateLoan {
    @RequestMapping(path = "calculateInterest", method = RequestMethod.POST)
    public ResponseEntity<Object> calculateRateOfInterest(@RequestBody Loan loan) {
        double loanAmount =  loan.getLoan();
        double rateOfInterest =  (loan.getRate() / 100) / 12;
        double tenure =  loan.getTenure();

        double mathPow = Math.pow((1 + rateOfInterest), tenure);

        double totalLoanAmountPerMonth = loanAmount
                * rateOfInterest
                * ((mathPow) / (mathPow - 1));

        return new ResponseEntity<>(totalLoanAmountPerMonth, HttpStatus.OK);
    }

    @RequestMapping(path = "calculateTotalLoanToBePaid", method = RequestMethod.POST)
    public ResponseEntity<Object> calculateTotalLoanToBePaidBeforeEndOfTenure(@RequestBody LoanBeforeEndOfTenure loanBeforeEndOfTenure) {
        double loanLeftToPay = loanBeforeEndOfTenure.getLoan();
        double rateOfEarlySettleMent = loanBeforeEndOfTenure.getRate() / 100;
        double totalLoanToPay = loanLeftToPay * (1 + rateOfEarlySettleMent);

        return new ResponseEntity<>(totalLoanToPay, HttpStatus.OK);
    }
}
