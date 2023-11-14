import React from 'react';

const SignIn = ({onRouteChange}) => {
    return (
        <article >
            <main className="pa4 ">
                <div className="measure center" >
                    <fieldset id="sign_up" className="bw2 b--washed-blue br3 ba shadow-5"  style={{
                        backgroundImage: 'linear-gradient(to top, #4facfe 0%, #00f2fe 100%)',padding:'5px 25px'}}>
                        <legend className="white f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="white db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="white pa2 b--white input-reset ba bg-transparent grow hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="white db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="white b b--white pa2 input-reset ba bg-transparent grow hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                        <div className="">
                        <input className="white b ph3 pv2 input-reset ba b--washed-blue bg-transparent grow pointer f6 dib" 
                                onClick={()=>onRouteChange('home')}
                                type="submit" 
                                value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                            <p href="#0" 
                                className="f6 link dim white db pointer"
                                onClick={()=>onRouteChange('register')}
                                >Register</p>
                        </div>
                    </fieldset>
                </div>
            </main>
        </article>
    )
}

export default SignIn;