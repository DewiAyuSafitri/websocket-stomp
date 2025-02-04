import React from "react";
import { Avatar, Card, List } from "antd";

function ListData(props) {
  const { data } = props;
  return (
     <Card  title="List Data" hoverable style={{ maxHeight: 750, overflowY: "auto" }}>
     <List
       itemLayout="horizontal"
       dataSource={data} 
       renderItem={(item, index) => (
         <List.Item>
           <List.Item.Meta
            //  avatar={
            //    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
            //  }
             title={
               <a href="https://ant.design">
                 {index + 1}. {item.from}
               </a>
             }
             description={item.text}
           />
         </List.Item>
       )}
     />
   </Card>
  );
}

export default ListData;
