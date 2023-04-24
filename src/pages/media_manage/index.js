import "react-datepicker/dist/react-datepicker.css";
import {BoardContainer, TitleContainer} from "../../assets/GlobalStyles";
import Navigator from "../../components/common/Navigator";
import Media from "./Media";
import {useParams} from "react-router-dom";
import MediaList from "./List";
import MediaListDetail from "./MediaListDetail";

export default function MediaManage() {
  const params = useParams()
  return (
    <BoardContainer>
      <TitleContainer>
        <div>
          <h1>지면 등록</h1>
          <Navigator/>
        </div>
      </TitleContainer>
      {params.id === 'media' &&
        <Media/>
      }
      {params.id === 'mediaList' &&
        <MediaList/>
      }
      {params.id === 'mediaListDetail' &&
        <MediaListDetail/>
      }
    </BoardContainer>
  )
}