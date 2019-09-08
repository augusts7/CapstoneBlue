
import React from 'react';
import "./DrawerItem.css";




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
                <a className="drawer-main-item" href={this.props.Link}>
                    <div><i className="drawer-icons material-icons">{this.props.Icon}</i><span>{this.props.Title}</span></div>
                </a>

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
                    return <a className="drawer-sub-item" href={item.Link}><li><i className="material-icons">{item.Icon}</i>{item.Title}</li></a>;
                })
                }
            </div>
        );
    }

}

export default DrawerItem;








