import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { BotDirective, BotHelperDirective, StyleSetDirective, BotService, ComService, IPayload, DEFAULT_OPTIONS, IWebChat } from 'ngx-microsoft-bot-framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [BotService, ComService, BotDirective, BotHelperDirective, StyleSetDirective],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild("botWindow", { static: false }) botWindowElement: ElementRef;
  passViewChild: ViewChild;
  renderObject: IWebChat;
  title = 'AzureBot';

  payload: IPayload = {
    secret: '1cdkUQJBHrY.0LFCSEJhHVqrNB9iRp-Em__2GQ7JmSimaaq5T4JzkZc',
    url: 'https://webchat.botframework.com/api/tokens',
    secretSetting: true,
    userId: 'USER_ID',
    webSocket: true
  };

  stylesetPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'BF',
    userAvatarInitials: 'CH',
    backgroundColor: '#131313',
    bubbleBackground: '#353535',
    bubbleBorderWidth: 0,
    bubbleBorderStyle: 'none',
    bubbleFromUserBorderWidth: 5,
    bubbleBorderColor: 'green',
    bubbleBorderRadius: '1px 25px 25px 25px',
    bubbleFromUserBorderColor: 'black',
    bubbleFromUserTextColor: 'white',
    bubbleTextColor: 'white',
    sendBoxTextColor: 'black',
    bubbleFromUserBackground: '#353535',
    sendBoxBackground: 'white',
    sendBoxBorderTop: 'solid 0px #E6E6E6',

    root: {

      /* width */
      ' ::-webkit-scrollbar': {
        width: '3px'
      },

      /* Track */
      ' ::-webkit-scrollbar-track': {
        background: '#131313' 
      },

      /* Handle */
      ' ::-webkit-scrollbar-thumb': {
        background: '#353535' 
      },

      /* Handle on hover */
      ' ::-webkit-scrollbar-thumb:hover': {
        background: 'red' 
      }           
    },
    textContent: {
      // fontFamily: '\'Comic Sans MS\', \'Arial\', sans-serif',
      // fontWeight: 'bold',
      cursor: 'crosshair',
      color: 'white'
    }
  };

  /*styleOptionsPayload: DEFAULT_OPTIONS = {
    rootHeight: '100%',
    botAvatarInitials: 'BF',
    userAvatarInitials: 'CH',
    backgroundColor: 'red',
    bubbleBackground: '#353535',
    bubbleBorderWidth: 0,
    bubbleBorderStyle: 'none',
    bubbleFromUserBorderWidth: 5,
    bubbleBorderColor: 'green',
    bubbleBorderRadius: '1px 25px 25px 25px',
    bubbleFromUserBorderColor: 'black',
    bubbleFromUserTextColor: 'white',
    bubbleTextColor: 'white',
    sendBoxTextColor: 'white',
    bubbleFromUserBackground: '#353535',
    sendBoxBackground: '#131313',
    sendBoxBorderTop: 'solid 0px #E6E6E6',
  }; */


  error: any;

  constructor(
    private botService: BotService,
    private comService: ComService,
    private bot: BotDirective,
    private botHelper: BotHelperDirective
) { }

public ngOnInit(): void {
  this.obtainStylePayload();
  this.obtainLocalToken();
}


public ngAfterViewInit(): void {
  this.setBotDirective();
}
 

setBotDirective(): void {
  this.passViewChild = this.botWindowElement.nativeElement;
  this.bot.botDirective(this.passViewChild);
}

obtainLocalToken() {
  this.comService.obtainToken(this.payload);
}

obtainStylePayload() {
  this.comService.obtainStylePayload(this.stylesetPayload, this.stylesetPayload)
}

makeError() {
  this.botService.makeIntentionalError().subscribe(null, error => this.error = error );
}



}
