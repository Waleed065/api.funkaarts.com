import moment from 'moment';
import totalPrice from '../utils/totalPrice';

interface schema{
    displayName: string;
    cities: string;
    expecting: {
        title: string;
        date: Date
    }[];
    table: {
        title: string;
        cityId: string;
        price: number;
        startDate: Date;
        endDate: Date;
    }[];
    addOns: {
        title: string;
        price: number;
    }[];
    currencyCode: string;
    exchangeRate: number
}
function invoiceHtml({displayName, cities, expecting, table, addOns, currencyCode, exchangeRate}:schema):string {
  return `<div>
            <div style="background-color: #c4a459; 
                        color: #fff; 
                        height: 70px; 
                        padding: 0 10px;
                        margin-bottom: 15px">
                <h2 style="float: left;">Vurtos.com</h2>
                <h2 style="float: right">Invoice</h2>
            </div>


            <div style='text-align: center;'>
                <h2 style="margin-bottom: 0px">Thanks ${displayName}</h2>
                <h3 style="margin-bottom: 0px">Your booking in ${cities} is confirmed ✓</h3>
            </div>


            <div>
                ${expecting.map(item => `<p>☑ ${item.title} is expecting you on ${moment(item.date).calendar()}</p>`)}
            </div>


            <table style="border-collapse: collapse;
                        width: 100%;">
                <tr >
                    <th style="border: 1px solid #dddddd;
                                text-align: left;
                                padding: 8px 5px;">
                        Item
                    </th>
                    <th style="border: 1px solid #dddddd;
                                text-align: left;
                                padding: 8px 5px;">
                        City
                    </th>
                    <th style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">
                        Price/Day
                    </th>
                    <th style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">
                        Start Date
                    </th>
                    <th style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">
                        End Date
                    </th>
                    <th style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">
                        Total Price
                    </th>
                </tr>


                ${
                    table.map((item, index) =>  {
                        const {title, cityId, price, startDate, endDate} = item;
                        return `<tr style="background-color: ${index%2 === 0 ? '#ffffff' : '#fff7e4'};">
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${title}</td>
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${cityId}</td>
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${currencyCode} ${(price * exchangeRate).toFixed(1)}</td>
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${moment(startDate).format('ll')}</td>
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${moment(endDate).format('ll')}</td>
                                    <td style="border: 1px solid #dddddd;text-align: left;padding: 8px 5px;">${currencyCode} ${(totalPrice({price, startDate, endDate}) * exchangeRate).toFixed(1) }</td>
                                </tr>`;
                    })
                }
            </table>

            ${Boolean(addOns.length) ? '<h3>Add Ons</h3>' : ''}
            ${ 
                Boolean(addOns.length) ? addOns.map((addOn, index) => {
                    return `<div>
                                <span>
                                    <strong>
                                    ${index + 1} ${addOn.title}
                                    </strong>
                                </span>
                                <span style="float: right;">${currencyCode} ${addOn.price * exchangeRate}</span>
                            </div>
                            <hr style='border-top: gray;' />`
                }) : ''
            }


            <br />
            <div>
                <span>
                    <strong>
                        Cancellation Cost
                    </strong>
                </span>
                <span style="float: right;">EUR 50</span>
            </div>
        
            <br />
            <div style="text-align: center;">
                <button style="padding: 10px;
                            color: #fff; 
                            background-color: red;
                            border: none; 
                            border-radius: 5px;">
                    Cancel Order
                </button>
                <p style="color: red; font-size: small; text-align: center;">This is non-refundable. Changing the dates of your
                    stay is not possible</p>
            </div>
        


            <br />
            <div style="padding: 10px; border: 1px solid #c4a459; background-color: #fff7e4; border-radius: 5px;">
                <div>
                    <strong>5 % fee for VAT is included</strong>
                </div>
                <div>
                    <strong>7 % fee for Municipality fee is included</strong>
                </div>
                <div>
                    <strong>10 % fee for service charge is included</strong>
                </div>
        
                <div>
                    <p>
                        As a routine procedure, the vurtos.com may take a temporary deposit to check the card you booked with
                        isn't lost or stolen and to guarantee your booking.
                        <br />
                        <br />
                        A booking fee is applicable, charges may vary
                        <br />
                        <br />
                        Please note: additional supplements except from chosen add-ons (e.g. extra bed) are not added to this total.
                        <br />
                        <br />
                        The total price shown is the amount you have payed for this order. Vurtos.com does not charge any
                        reservation, administration or other fees.
                        <br />
                        <br />
                        If you don't show up or if you cancel your order then applicable taxes may still be charged by Vurtos.com.
                    </p>
                </div>
            </div>
            
            <br />
            <br />
            <strong>Payment</strong>
            <p>
                You have now confirmed and guaranteed your reservation by credit card.
                <br />
                The total price of the reservation has been charged at the time of booking.
                <br />
                Please note that your credit card may be pre-authorised prior to your arrival.
                <br />
                <b>Vurtos.com accepts the following forms of payment:</b>
                <br />
                American Express, Visa, Euro/Mastercard, Diners Club, JCB
            </p>
            <hr />
            <br />        
    

            <strong>Important information</strong>
            <p>
                Please note that the additional fee for any extra service used at the time of consuming your order is payable to the
                service provider directly.
                <br />
                Please note that any readjustments to the booking at the time of consuming your order may only be discussed with service provider.
                <br />
                Please note that Vurtos.com does not take responsibility of any theft or damage to property/life or any other unforeseen that may occur during this period.
                <br />
            </p>
            <b>Is everything correct?</b>
            <p>You can always view or change your booking online - no registration required.</p>
        
            
            <div>
                <a href="https://vurtos.com/about" target="_blank" rel="noreferrer">
                    <li>About Us</li>
                </a>
                <a href="https://vurtos.com/terms-of-service" target="_blank" rel="noreferrer">
                    <li>Terms Of Service</li>
                </a>
        
                <a href="https://vurtos.com?show=contact-us" target="_blank" rel="noreferrer">
                    <li>Contact Us</li>
                </a>
                <a href="https://vurtos.com/affiliates" target="_blank" rel="noreferrer">
                    <li>Become Affiliate</li>
                </a>
            </div>




            <hr />
            <br />
            <div>
                <div>
                    <span>
                        <strong>Email</strong>
                    </span>
                    <span>
                        vurtosapp@gmail.com
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Contact:</strong>
                    </span>
                    <span>
                        +92 123123123
                    </span>
                </div>
                <div>
                    <span>
                        <strong>Dated: </strong>
                    </span>
                    <span>
                        ${moment().calendar()}
                    </span>
                </div>
            </div>
        
            
            <br />
            <div style="
                    height: 5px;
                    position: relative;
                    border-top-color: #000;
                    background-image: linear-gradient(
                        to right,
                        gray 40%,
                        #fff 10%
                    );
                    background-size: 25px 2px;
                    background-repeat: repeat-x;">
                <span style="position: absolute;
                                right: 0px;
                                top: -11px;
                                background-color: #fff;
                                font-size: 20px;
                                z-index: 3;
                                transform: rotate(180deg);">
                    ✄
                </span>
            </div>
            <br />


            <div>
                <span>
                    <strong>
                        Grand Total
                    </strong>
                </span>
                <span style="float: right;">${currencyCode} ${0}</span>
            </div>
            <br />
    

            <div
                style="text-align: center;padding: 10px; border: 1px solid #c4a459; background-color: #fff7e4; border-radius: 5px;">
                <strong style="color:#c4a459">Keep this confirmation in your pocket</strong>
                <p>No data, WiFi or printer need with the FREE app.</p>
                <button style="padding: 10px; border-radius: 5px; background-color: #c4a459; border: none; color: #fff">
                    Download our app
                </button>
                <p style="color: gray; font-size: small; margin-bottom: 0px;">
                    Available for iPhone, iPad and Android
                </p>
            </div>
        
            <div>
                <hr style='border-top: gray;' />
                <p style="color: gray; font-size: small; text-align: center;">
                    <b>Copyright</b> © 1996–2019 Booking.com. All rights reserved.
                    <br />
                    When communicating with your booked order via Vurtos.com you agree with the processing of the
                    communications as set out in our <a href="https://vurtos.com/terms-of-service" target="_blank" rel="noreferrer">Privacy
                        Policy</a>.
                </p>
            </div>
        
        </div>`;
}


function invoiceText({displayName, cities, expecting}:schema):string{
    return `Vurtos.com Invoice.\n
        Thanks ${displayName}.\n
        Your booking in ${cities} is confirmed ✓.\n
        ${expecting.map(item => `☑ ${item.title} is expecting you on ${moment(item.date).calendar()}.\n`)}

    `;
}


export {invoiceHtml}