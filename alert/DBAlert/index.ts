
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initMutationObserver, startCustomControlProcess } from "../../shared/utils";
import {DBAlertProps} from "@db-ui/react-components/dist/components/alert/model";
import {DBAlert} from "@db-ui/react-components";
import "./../../shared/index.scss"

export class DBAlertPA
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private overViewContainer: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private props: DBAlertProps = {
  };
    private clicked: boolean;
  
	private canvasWidthState = "controlled";
	private canvasHeightState = "fixed";

  constructor() {
  }


  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    let currentPageContext = context as any;
    currentPageContext = currentPageContext
      ? currentPageContext["page"]
      : undefined;
	    if (currentPageContext) {
				this.props.headline = currentPageContext.headline;
				this.props.children = currentPageContext.children;
				this.props.icon = currentPageContext.icon;
				this.props.variant = currentPageContext.variant;
		    }
	    context.mode.trackContainerResize(true);
	this._notifyOutputChanged = notifyOutputChanged;
    this.overViewContainer = container;
    this.overViewContainer.setAttribute(
			'data-canvas-height-state',
			this.canvasHeightState
		);
		this.overViewContainer.setAttribute(
			'data-canvas-width-state',
			this.canvasWidthState
		);

	initMutationObserver();
	setTimeout(startCustomControlProcess, 500);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.props.headline = context.parameters.headline.raw || undefined;
	        this.props.children = context.parameters.children.raw || undefined;
	        this.props.icon = context.parameters.icon.raw || undefined;
	        this.props.variant = context.parameters.variant.raw || undefined;
	            	this.props.onClick = ()=> {
		this.clicked = true;
		this._notifyOutputChanged();
	};
    
    ReactDOM.render(
      React.createElement(DBAlert, this.props),
      this.overViewContainer
    );

	let shouldUpdate = false;

    	if (this.clicked) {
		this.clicked = false;
		shouldUpdate = true;
	}
    	if (shouldUpdate) {
		this._notifyOutputChanged();
	}

	startCustomControlProcess();
  }

  public getOutputs(): IOutputs {
    return {
        	clicked: this.clicked,
        };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.overViewContainer);
  }
}



