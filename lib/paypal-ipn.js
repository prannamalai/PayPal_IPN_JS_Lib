/**
 * Library for PayPal IPN
 */
var fs = require('fs');
var qs = require('querystring');

var _ = require('./underscore');

var configJSON = fs.readFileSync("params.json");
var params = JSON.parse(configJSON.toString());

console.log(params);

var sampleQueryString = 'mc_gross[1]=19.95&mc_gross[0]=19.95&protection_eligibility=Eligible&address_status=confirmed&payer_id=LPLWNMTBWMFAY&tax=0.00&address_street=1+Main+St&payment_date=20%3A12%3A59+Jan+13%2C+2009+PST&payment_status=Completed&charset=windows-1252&address_zip=95131&first_name=Test&mc_fee=0.88&address_country_code=US&address_name=Test+User&notify_version=2.6&custom=&payer_status=verified&address_country=United+States&address_city=San+Jose&quantity=1&verify_sign=AtkOfCXbDm2hu0ZELryHFjY-Vb7PAUvS6nMXgysbElEn9v-1XcmSoGtf&payer_email=gpmac_1231902590_per%40paypal.com&txn_id=61E67681CH3238416&payment_type=instant&last_name=User&address_state=CA&receiver_email=gpmac_1231902686_biz%40paypal.com&payment_fee=0.88&receiver_id=S8XGHLYDW9T3S&txn_type=express_checkout&item_name=&mc_currency=USD&item_number=&residence_country=US&test_ipn=1&handling_amount=0.00&transaction_subject=&payment_gross=19.95&shipping=0.00';

var param = qs.parse(sampleQueryString);

// Object.keys(params)
// instanceof
// console.log(params);

console.log(Object.keys(param).length);
console.log(_.include(Object.keys(param), "mc_gross[1]"));

var message = new Message();
_.keys(message).map(
		function(key) {

			if (_.has(params, key)) {
				console.log(_.chain(params).pick(params, key).values().map(
						function(str) {
							console.log(str.split(","));
						}));
			}
		});

// console.log(merchant instanceof Merchant);

function Message() {
	this.merchant = new Merchant();
	this.payer = new Payer();
	this.transaction = new Transaction();
};

function Merchant() {
	// Empty
};

function Payer() {
	// Empty
};

function Transaction() {
	// Empty
};

