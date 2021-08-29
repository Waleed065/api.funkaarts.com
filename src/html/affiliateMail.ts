import moment from 'moment';

interface schema {
  displayName: string;
  email: string;
  aid: string;
}
export function affliateHtml({ displayName, email, aid }: schema): string {
  return `
        <div>
            <div style="background-color: #c4a459; 
                        color: #fff; 
                        height: 70px; 
                        padding: 0 10px;
                        margin-bottom: 15px">
                <h2 style="float: left;">Vurtos.com</h2>
                <h2 style="float: right">Affiliate Partner Program</h2>
            </div>

            <div style="padding: 0 10%">
                <div style='text-align: center;'>
                    <h2 style="margin-bottom: 0px">Thanks ${displayName}</h2>
                    <h3 style="margin-bottom: 0px">Welcome to Vurtos.com affiliate partner programme.</h3>
                </div>
                <br />
                <p>
                    Hello, ${displayName}! We're very glad that you've joined the Vurtos.com Affiliate Partner Programme! We've assigned
                    you an Affiliate ID - (AID). This ID will be used to track bookings made through your platfrom.
                    <br />
                    We've opened
                    <a href="https://vurtos.com/account/affiliate-dashboard" target="_blank" rel="noreferrer" >Affiliate Partner Dashboard</a> for your account which you
                    can use to manage your affiliate account.
                </p>


                <div
                style="padding: 20px; border: 1px solid #c4a459; background-color: #fff7e4; border-radius: 5px; text-align: center;">
                    <div style="background-color: #fff;margin: 3% 5%; padding: 30px; border-radius: 5px;">
                        <p style="margin-top:20px; margin-bottom: 5px">Your Username:</p>
                        <div>
                            <strong>${email}</strong>
                        </div>
        
        
                        <p style="margin-top:20px; margin-bottom: 5px">Your affiliate ID (AID):</p>
                        <div>
                            <strong>${aid}</strong>
                        </div>
                    </div>
                    <p>
                        You're one step away from being eligble to earn commision through your website!
                    </p>
                    <button
                        style="height: 40px; border: none; color: #fff; background-color: #c4a459;border-radius: 5px;">Verify
                        Your Domain</button>
                    <p>
                        If you need help on how to verify your domain, please watch this <a
                            href="https://www.youtube.com/watch?v=sAr-e2cmLJ8">tutorial</a>
                    </p>
                </div>
    

                <br />
                <strong>Important Note</strong>
                <p>
                    Please note that by becoming our affiliate partner you've agreed to the terms of affiliate partner program
                    and privacy cookie statement.
                    <br />
                    Please note that your request for joining affiliate partner program is under progress.
                    <br />
                    Your current status for affiliate partner is in pending mode at the moment.
                    <br />
                    As soon as your provided documents/information is verified, we'll upgrade your status to being active.
                    <br />
                </p>
                <b>Is everything right?</b>
                <p>You can always view and learn more about us here.</p>
        
                <div>
                    <a href="https://vurtos.com/affiliates-terms" target="_blank" rel="noreferrer">
                        <li>Affiliate Partner Agreement</li>
                    </a>
        
                    <a href="https://vurtos.com/about" target="_blank" rel="noreferrer">
                        <li>About Us</li>
                    </a>
                    <a href="https://vurtos.com/terms-of-service" target="_blank" rel="noreferrer">
                        <li>Terms Of Service</li>
                    </a>
        
                    <a href="https://vurtos.com?show=contact-us" target="_blank" rel="noreferrer">
                        <li>Contact Us</li>
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
        </div>
  `;
}

export function affiliateText({ displayName, email, aid }: schema): string {
  return `
  Thanks ${displayName}\n\n
  Welcome to Vurtos.com affiliate partner programme.\n\n
  Hello, ${displayName}! We're very glad that you've joined the Vurtos.com Affiliate Partner Programme! We've assigned you an Affiliate ID - (AID). This ID will be used to track bookings made through your platfrom. 
  We've opened Affiliate Partner Dashboard for your account which you can use to manage your affiliate account.\n\n\n
  Your Username: ${email}\n
  Your affiliate ID (AID): ${aid}\n\n\n
  `;
}
