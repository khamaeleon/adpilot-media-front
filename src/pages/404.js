import {Component} from "react";

export class NotFound extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div id='container'>
        <article>
          <p>원하는 페이지가 없습니다.</p>
        </article>
      </div>
    );
  }
}