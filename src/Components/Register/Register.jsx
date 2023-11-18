import React from 'react';

class Register extends React.Component {
    constructor(props)
    {
        super(props)
        this.state ={
            name:'',
            email:'',
            passwrod:'',
        }
    }

    onNameChange = (event) =>{
        this.setState({name:event.target.value});
    }
    onEmailChange = (event) =>{
        this.setState({email:event.target.value});
    }
    onPasswrodChange = (event) =>{
        this.setState({passwrod:event.target.value});
    }

    onSubmitSignUp = () => {
        if(!this.state.signInEmail.includes('@')
            || this.state.name === ''
            ||  this.state.passwrod.length < 6)
        {return;}

        fetch('http://localhost:3000/register',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(
                {name:this.state.name,
                email:this.state.email,
                password:this.state.passwrod})})
        .then(res => res.json())
        .then(user => {
            if(user)
            {
                this.props.LoadUser(user);
                this.props.onRouteChange('home')
            }
        })
        
    }


    render()
    {
        const {onRouteChange} = this.props;
        return (
            <article >
                <main className="pa4 ">
                    <div className="measure center" >
                        <fieldset id="sign_up" className="bw2 b--washed-blue br3 ba shadow-5" style={{
                            backgroundImage: 'linear-gradient(to top, #4facfe 0%, #00f2fe 100%)',padding:'5px 25px'
                        }}>
                            <legend className="white f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="white db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange}
                                className="white pa2 b--white input-reset ba bg-transparent grow hover-white w-100" type="text" name="name"  id="name" />
                            </div>
                            <div className="mt3">
                                <label className="white db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                className="white pa2 b--white input-reset ba bg-transparent grow hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="white db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswrodChange}
                                className="white b b--white pa2 input-reset ba bg-transparent grow hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                            <div className="">
                            <input className="white b ph3 pv2 input-reset ba b--washed-blue bg-transparent grow pointer f6 dib" 
                                    onClick={this.onSubmitSignUp}
                                    type="submit" 
                                    value="Register"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p href="#0" className="f6 link dim white db pointer" onClick={()=>onRouteChange('signin')}>Sign In</p>
                            </div>
                        </fieldset>
                    </div>
                </main>
            </article>
        )
    }

}

export default Register;