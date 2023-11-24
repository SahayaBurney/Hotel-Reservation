import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function googleLogin(){
    return(
        <GoogleOAuthProvider clientId="">
            <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
                }}/>;
        </GoogleOAuthProvider>
    )
}

export default googleLogin