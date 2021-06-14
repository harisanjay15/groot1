import React, { Component } from 'react';
import { Card, Icon, Image,Button } from 'semantic-ui-react'

 
class RestAPI extends Component {
    state = {
        student: [],
        popup: 0,
        view: 0,
        auth:0
      }
      componentDidMount() {
        fetch("https://60c7266706f3160017d289bf.mockapi.io/student/student")
        .then(res => res.json())
        .then((data) => {
          this.setState({ student: data })
          console.log(this.state.student)
        })
        .catch(console.log)
      }

    renderfullprofile (s){

        let arr=this.state.student;
        for (let i = 0; i < arr.length; i++){
            if(arr[i].id==s)
            {
                console.log("got it..!");
                this.setState({ view:arr[i] , popup :1 } , console.log("got it..! updated.."));
            }
        }
 
      }
      closepopup()
      {
        this.setState({ popup: 0 });
      }

      login()
      {
          this.setState({auth:1});
      }


  render() {

    console.log(this.state.popup);

    if(this.state.auth==0)
    {
        return(
        <form onSubmit={this.authenticate}>
                                            <div className="form-group row">
                                            <label htmlFor="username"
                                                       className="col-sm-12 col-form-label">User Name:</label>
                                                <div className="col-sm-12">
                                                    <input type="text" className="form-control" id="username"
                                                            placeholder="Enter Username"
                                                           />
                                                </div>
                                                <label htmlFor="password"
                                                       className="col-sm-12 col-form-label">Password:</label>
                                                <div className="col-sm-12">
                                                    <input type="password" className="form-control" id="password"
                                                            placeholder="Enter Password"/>
                                                </div>
                                            </div>

                                            <button type="button" onClick={()=>this.login() }
                                                    className="premium-button">Submit
                                            </button>
                                        </form>)
    }
    else{

        if(this.state.popup==1)

        {
        
        let cprofile = this.state.view;
        console.log("popup",this.state.view);
        return(
            <>
                <img src={cprofile.avatar}></img><br></br>
                <h1>Name : {cprofile.name}</h1><br></br>
                <h1>City : {cprofile.city}</h1><br></br>
                <h1>Country : {cprofile.Country}</h1><br></br>
                <h1>Zip : {cprofile.Zip}</h1><br></br>
                <h1>Mail : {cprofile.mail}</h1><br></br>

                <button onClick={()=>{this.renderfullprofile( (parseInt(cprofile.id)+1))  }}>next</button>
                <button onClick={()=>{this.renderfullprofile( (parseInt(cprofile.id)-1))  }}>prev</button>
                <button onClick={()=>this.closepopup() }>close</button> 
            </>
        )

        

    }

    else
    {

    return (
        <>
         {this.state.student.map((student) => (
            //    <Card>
            //         <Image src={student.avatar} wrapped ui={false} />
            //         <Card.Content>
            //             <Card.Header>{student.name}</Card.Header>
            //             <Card.Meta>
            //                 <span className='date'>{student.number}</span>
            //             </Card.Meta>
            //             <Card.Description>
            //                 {student.city},{student.country},{student.zip}
            //             </Card.Description>
            //              </Card.Content>
            //         <Card.Content extra>
                        
            //             <Icon name='user' />
            //                 {student.mail}
                        
            //         </Card.Content>
            //     </Card>
            <Card>
            <Card.Content>
              <Image
                floated='right'
                size='mini'
                border ="circular"
                src={student.avatar}
              />
              <Card.Header>{student.name}</Card.Header>
              <Card.Meta>{student.mail}</Card.Meta>
              <Card.Description>
                Address : <strong> {student.city},{student.country},{student.zip}</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui buttons' onClick={()=>{this.renderfullprofile(student.id)}}>
                <Button basic color='green'>
                  View Profile
                </Button>
                
              </div>
            </Card.Content>
          </Card>
            
         ))}
         
        </>
     );

    }}
  }
}
export default RestAPI;