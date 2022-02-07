import React, { useEffect, useRef } from "react";

const PayPal = ({ totalPrice }) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: "77.44", // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                },
              },
            ],
          });
        },
        // Finalize the transaction after payer approval
        onApprove: function (data, actions) {
          const order = actions.order.capture();
          console.log(order);
          // return actions.order.capture().then(function (orderData) {
          //   // Successful capture! For dev/demo purposes:
          //   console.log(
          //     "Capture result",
          //     orderData,
          //     JSON.stringify(orderData, null, 2)
          //   );
          //   var transaction = orderData.purchase_units[0].payments.captures[0];
          //   alert(
          //     "Transaction " +
          //       transaction.status +
          //       ": " +
          //       transaction.id +
          //       "\n\nSee console for all available details"
          //   );

          //   // When ready to go live, remove the alert and show a success message within this page. For example:
          //   // var element = document.getElementById('paypal-button-container');
          //   // element.innerHTML = '';
          //   // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          //   // Or go to another URL:  actions.redirect('thank_you.html');
          // });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;
