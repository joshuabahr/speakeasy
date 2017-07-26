import React, {Component} from 'react'
import apiai from 'apiai';
import {ApiAiClient} from 'api-ai-javascript';
import { ChatFeed, Message } from 'react-chat-ui'
import Header from '../components/header'
// import 'react-to-target-auto-scroll'
class AIChat extends Component {
  constructor(props){
    super(props);

    this.state = {
      textRequest: '',
      conversation: [],
      messages : [
        // (new Message({ id: 1, message: "I'm the recipient! (The person you're talking to)" })), // Gray bubble 
        // (new Message({ id: 0, message: "I'm you -- the blue bubble!" })), // Blue bubble 
        // (new Message({ id: 0, message: "I'm you -- the blue bubble!, again" })) // Blue bubble 
      ],
      is_typing: false,

    }

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAPI = this.getAPI.bind(this);
    this.renderHeading = this. renderHeading.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

  }

  componentDidUpdate(){
    this.scrollToBottom(document.getElementById("out"));
  }
  renderHeading() {
    let heading;

    if (this.props.brand) {
      heading =  <h1 className="brand-heading">{this.props.brand}</h1>
    } else if (this.props.renderPhoto) {
      heading = this.props.renderPhoto()
    }
    return heading;
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  scrollToBottom(el) {
    var isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop - 10;
    if(!isScrolledToBottom) {
     el.scrollTop =el.scrollHeight -el.clientHeight;
    }
  }

  handleSubmit(event){
    console.log("the input is", this.state.textRequest);
    this.getAPI(this.state.textRequest)
    event.preventDefault();
    this.setState({
      messages:[...this.state.messages, (new Message({id:1, message:`${this.state.textRequest}`}))],
      textRequest: ''
    })
    // this.scrollToBottom(document.getElementById("out"));
  }

  handleInputOnChange(event){
    this.setState({
      textRequest:event.target.value
    })
  }

  getAPI(meTalking) {
    const client = new ApiAiClient({accessToken: 'e64ea01b3589490ba7a2eefeec7acce4'})
    .textRequest(meTalking)
        .then((response) => {
          console.log("API.AI response", response.result.fulfillment.speech)
          this.setState({
            messages:[...this.state.messages, (new Message({id:0, message:`${response.result.fulfillment.speech}`}))]
          })
        })
        .catch((error) => {console.log("API.AI response is currently not working")})
  }
  
  render(){
    return(
      <div>  
      <header className="introAI">
        <div className="intro-body">
          <div className="container row col-md-8 col-md-offset-2">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                {this.renderHeading()}
                <label>{this.props.label}</label>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="chat-section">
      <div className="container content-section text-center">
        <div className="container text-center row col-md-8 col-md-offset-2">
        <div className="aiAligner">
          <form onSubmit = {this.handleSubmit} className=".Aligner-item--top">
            <br></br>
            <input 
              type="text" 
              value={this.state.textRequest} 
              onChange={this.handleInputOnChange} 
              ref={(input) => { this.nameInput = input; }} 
              placeholder="Talk to me, I am a bot"
              className="aiInputField"
            />
            <br></br>
            <input 
              type="submit" 
              name="chatSubmit"
              className="aiSubmitButton"
            />
          </form>
          <br></br>
        </div>
        
         <div id="out" className="aiMessages">
          <ChatFeed
            messages={this.state.messages} // Boolean: list of message objects 
            isTyping={this.state.is_typing} // Boolean: is the recipient typing 
            hasInputField={false} // Boolean: use our input, or use your own 
            bubblesCentered={false} //Boolean should the bubbles be centered in the feed?  
            
            bubbleStyles={
              {
                text: {
                  fontSize: 15
                },
                chatbubble: {
                  borderRadius: 20,
                  padding: 10
                }
              }
            }
          />
        </div> 
        </div>
      </div>
      </section>
      </div>
    )
  }
}


export default AIChat