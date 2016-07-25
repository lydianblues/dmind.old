<?php

require_once 'vendor/braintree/braintree_php/lib/Braintree.php';
require_once 'braintree-config.php';

if (isset($_POST['nonce'])) {

    $nonce = $_POST["nonce"]; // payment_method_nonce
    $amount = $_POST["amount"];

    // With this nonce, we should do a transaction...

    $result = Braintree_Transaction::sale([
        'amount' => $amount,
        'paymentMethodNonce' => $nonce,
        'options' => [
            'submitForSettlement' => True
        ]
    ]);

    $output = array();

    if ($result->success) {

        // Should we invalidate the cookies for reg_type and reg_id?

        $output['success'] = true;
        $transaction = $result->transaction;
        $output['status'] = $transaction->status;
        $output['paymentInstrumentType'] = $transaction->paymentInstrumentType;
        $output['amount'] = $transaction->amount;
        $output['id'] = $transaction->id;
        $output['type'] =$transaction->type;

        // The following line causes an exception when we don't have
        // a PayPal transaction.
        if ($transaction->paymentInstrumentType === 'paypal_account') {
            $output['authorizationId'] =
                $transaction->paypalDetails->authorizationId;
            $output['captureId'] =
                $transaction->paypalDetails->captureId;
            $output['payerFirstName'] =
                $transaction->paypalDetails->payerFirstName;
            $output['payerLastName'] =
                $transaction->paypalDetails->payerLastName;
            $output['payerId'] =
                $transaction->paypalDetails->payerId;
            $output['paymentId'] =
                $transaction->paypalDetails->paymentId;
            $output['transactionFeeAmount'] =
                $transaction->paypalDetails->transactionFeeAmount;
        } else {
            $output['processorAuthorizationCode'] =
                $transaction->processorAuthorizationCode;
            $output['bin'] = $transaction->creditCardDetails->bin;
            $output['cardType'] = $transaction->creditCardDetails->cardType;
            $output['cardholderName'] =
                $transaction->creditCardDetails->cardholderName;
            $output['last4'] =
                $transaction->creditCardDetails->last4;
            $output['cardType'] =
                $transaction->creditCardDetails->cardType;
            $output['debit'] =
                $transaction->creditCardDetails->debit;

        }
    } else {
        $output['success'] = false;
        $errorString = "";
        foreach ($result->errors->deepAll() as $error) {
            $errorString .= 'Error: ' . $error->code . ": " .
                $error->message . "\n";
        }
        $output['error'] = $errorString;
    }
    echo json_encode($output, true);

}


