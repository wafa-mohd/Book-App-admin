import ContentWrap from "./ContentWrap";
import Sidebar from "./Sidebar";

export default function Layout(props) {
  return (
    <div id="wrapper">
      <Sidebar />
      <ContentWrap >
          {props.children}
      </ContentWrap>
    </div>
  );
}
