import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
export default class RouteView extends Component{
      render(){
          let {routes} = this.props;

          let myRoutes=routes.filter(v=>!v.redirect&&v.path!=="*")

          let myRedirect=routes.filter(v=>v.redirect)

          let myArr = routes.filter(v=>v.path==="*")

          return (
              <Switch>
                  {
                      myRoutes.map((v,i)=>{
                          return(
                              <Route path={v.path} key={i} render={(props)=>{
                                  if(v.children){
                                      return <v.compoent routes={v.children} {...props} />
                                  }else{
                                      return <v.component {...props} />
                                  }
                              }}></Route>
                              
                              )
                      })
                  }
                  {
                      myRedirect.map((v,i)=>{
                          return <Redirect key={i} from={v.path} to={v.redirect}></Redirect>
                      })
                  }
                  {
                      myArr.map((v,i)=>{
                          return <Route path={v.path} component={v.compoent} key={i}></Route>
                      })
                  }

              </Switch>
          )

      }
}