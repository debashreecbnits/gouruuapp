import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FlutterwaveInit, PayWithFlutterwave } from 'flutterwave-react-native';
import { backgroundColor } from 'styled-system';
import { apiCallWithToken } from '../../Api';
import { FUND_RELEASE, INSERT_PAYMENT_DETAILS } from '../../shared/allApiUrl';
import CommonStyles from '../../../CommonStyles';

export default class FlutterWavePay extends Component {
  abortController = null;
  constructor(props) {
    super(props);
    this.state = {

      isPending: false,
      transactionId: "",
      hirerId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.userid,
      jobId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.jobid,
      freelancerId: this.props && this.props?.navigation && this.props?.navigation?.state && this.props?.navigation?.state?.params && this.props?.navigation?.state?.params?.freelancerId,
      transactionDataStore: [],
      fundreleaseStatus: "",
    };
  }
  handleOnRedirect = (data) => {
    console.log("data details==>", data)
    //handlePaymentOnTheServer(data.transaction_id);
    //this.props.navigation.navigate('ProjectDetails')
    this.setState({ transactionId: data?.transaction_id })
    //   var dataa = {
    //     fundid : this.state.transactionId
    // }

    var formData = new FormData();
    formData.append('fundid', data?.transaction_id);

    apiCallWithToken(FUND_RELEASE, 'post', formData).then((response) => {

      if (response.status == 200) {
        this.setState({ transactionDataStore: response?.data?.data });
        this.setState({ fundreleaseStatus: response?.data?.status });

        //-----insert api for save data
        var formData = new FormData();
        formData.append('hirer_id', this.state?.hirerId);
        formData.append('freelancer_id', this.state?.freelancerId);
        formData.append('transaction_id', this.state?.transactionId);
        formData.append('job_id', this.state?.jobId);

        formData.append('amount', this.state?.transactionDataStore?.amount);
        formData.append('type', this.state?.transactionDataStore?.card.type);
        formData.append('currency', this.state?.transactionDataStore?.currency);
        formData.append('payment_type', this.state?.transactionDataStore?.payment_type);
        formData.append('name', this.state?.transactionDataStore?.customer?.name);
        formData.append('milestone_id', this.props?.navigation?.state?.params?.milestoneId);
        formData.append('amount_settled', "");


        apiCallWithToken(INSERT_PAYMENT_DETAILS, 'post', formData).then((response) => {

          if (response.status == 200) {

            if (response.data.status === 1) {
              this.props.navigation.navigate('ProjectDetails2', { transactionId: this.state.transactionId, fundreleaseStatus: this.state.fundreleaseStatus })
              //this.props.navigation.navigate('NotificationDetails',{transactionid:this.state.transactionId})  
            }
            else {
              this.props.navigation.navigate('Projects');
            }
          }
        })
          .catch((error) => {
            console.log(error);
          });
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  generateRef = (length) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  }




  render() {
    const { isPending } = this.state;
    return (
      <View style={[CommonStyles.rowcenter, { flex: 1 }]}>

        {/* <TouchableOpacity
          style={[
            //styles.paymentbutton,
            isPending ? <Text>hello</Text>: {}
          ]}
          disabled={isPending}
          onPress={this.handlePaymentInitialization}
        >
          <Text>
          Pay $100
          </Text>
        </TouchableOpacity> */}
        {/*
      // Test MasterCard Pin authentication
    // Card number: 5531 8866 5214 2950
    // cvv: 564
    // Expiry: 09/32
    // Pin: 3310
    // OTP: 12345 */}
        <PayWithFlutterwave

          onRedirect={this.handleOnRedirect}
          options={{
            //tx_ref: this.generateRef(11),
            tx_ref: Date.now(),
            //authorization: 'FLWPUBK_TEST-89d08235dac03d4815044c91830d8744-X',
            authorization: 'FLWPUBK_TEST-6a7fc6690620d93b2982d7cfd17e6505-X',
            customer: {
              email: 'user@gmail.com',
              phonenumber: '07064586146',
              name: 'joel ugwumadu',
            },
            //amount: this.props?.navigation?.state?.params?.amount,
            amount: this.props?.navigation?.state?.params?.amount,
            currency: 'NGN',
            //payment_options: 'card'
            payment_options: 'card,mobilemoney,ussd',
            subaccounts: [
              {
                id: "RS_1640330D3BA93A573433C473605E4E03",
                transaction_charge_type: "flat_subaccount",
              },
            ],
            meta: {
              rave_escrow_tx: 1,
            },
          }}
        />
      </View>
    )
  }
}