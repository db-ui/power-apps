
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { initMutationObserver, startCustomControlProcess } from "../../shared/utils";
import {DBBrandProps} from "@db-ui/react-components/dist/components/brand/model";
import {DBBrand} from "@db-ui/react-components";
import "./../../shared/index.scss"
export class DBBrandPA
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private overViewContainer: HTMLDivElement;
  private _notifyOutputChanged: () => void;
  private props: DBBrandProps = {
  };
  
	private canvasWidthState = "fixed";
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
				this.props.anchorRef = currentPageContext.anchorRef;
				this.props.title = currentPageContext.title;
				this.props.children = currentPageContext.children;
				this.props.imgSrc = currentPageContext.imgSrc;
				this.props.imgAlt = currentPageContext.imgAlt;
				this.props.imgWidth = currentPageContext.imgWidth;
				this.props.imgHeight = currentPageContext.imgHeight;
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
        this.props.anchorRef = context.parameters.anchorRef.raw || undefined;
	        this.props.title = context.parameters.title.raw || undefined;
	        this.props.children = context.parameters.children.raw || undefined;
	        this.props.imgSrc = context.parameters.imgSrc.raw || undefined;
	        this.props.imgAlt = context.parameters.imgAlt.raw || undefined;
	        this.props.imgWidth = context.parameters.imgWidth.raw || undefined;
	        this.props.imgHeight = context.parameters.imgHeight.raw || undefined;
	            
    ReactDOM.render(
      React.createElement(DBBrand, this.props),
      this.overViewContainer
    );

	let shouldUpdate = false;

    	if (shouldUpdate) {
		this._notifyOutputChanged();
	}

	startCustomControlProcess();
  }

  public getOutputs(): IOutputs {
    return {
            };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.overViewContainer);
  }
}



