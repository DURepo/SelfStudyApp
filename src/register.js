import React from 'react';

class register extends React.Component {
    constructor(props){
        super();
        this.state= {
            email: '',
            password: '',
            name:''
        }
    }

    onNameChange = (event) => {
        this.setState({Name : event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password : event.target.value})
    }

    onSubmitRegister = () => {
           

        fetch('http://localhost:3001/register', {
            method:'post',
            headers:{'content-Type': 'application/json'},
            body:JSON.stringify({
                email: this.state.email,
               password:  this.state.password,
               name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user=>{
            this.props.loadUser(user)
            this.props.onRouteChange('home');
                   
            
        })       
        
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <div>
                <label >Name</label>
                <input id="name" type="name" onChange={this.onNameChange} ></input>
                <label >Email</label>
                <input id="email" type="email" onChange={this.onEmailChange} ></input>
                <label >Password</label>
                <input id="password" type="password" onChange={this.onPasswordChange} ></input>
                <button type="submit" onClick={this.onSubmitRegister}>Register</button>
            </div>

        );
    }
}

export default register;