
import React from 'react';
import "./DrawerItem.css";

import { Link } from 'react-router-dom'


class DrawerItem extends React.Component {

    constructor(props) {
        super(props);

        this.GetSubMenu = this.GetSubMenu.bind(this);
    }

    GetSubMenu(items) {
        if (items == null || items.length == 0) {
            return "";
        }
        let html;
        return <SubMenu Items={items} /> 
    }

  
    render() {


        return (
            <div className="drawer-item">
                <Link className="drawer-main-item" to={this.props.Link}>
                    <div><i className="drawer-icons material-icons">{this.props.Icon}</i><span>{this.props.Title}</span></div>
                </Link> 

                <div className="drawer-sub-items">
                    {this.GetSubMenu(this.props.SubItems)} 
                </div>
            </div>
            
        );
    }
}

class SubMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.Items.map(item => {
                    return <Link className="drawer-sub-item" to={item.Link}><li><i className="material-icons">{item.Icon}</i>{item.Title}</li></Link>;
                })
                }
            </div>
        );
    }

}

export default DrawerItem;








