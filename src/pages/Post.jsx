import React from "react";
import AdminNavbar from "../components/layout/AdminNavbar";
import AdminSidebar from "../components/layout/AdminSidebar";
import LogoBar from "../components/layout/LogoBar";
import PostAdd from "./AddPost";
import PostView from "./ViewPost"
function Post() {
  return (
    <div className="wrapper">
      <div className="main-header">
        <LogoBar />
        <AdminNavbar />
      </div>
      <AdminSidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
          <div className="row">
                            <div className="col-lg-12">

                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">post</h4>
                                    </div>
                                    <div className="card-body">
                                        <ul className="nav nav-pills nav-secondary" id="pills-tab" role="tablist">
                                            <li className="nav-item submenu">
                                                <a className="nav-link active show" id="group-tab" data-toggle="pill" href="#group" role="tab" aria-controls="group" aria-selected="true">Post List</a>
                                            </li>
                                            <li className="nav-item submenu">
                                                <a className="nav-link" id="individual-tab" data-toggle="pill" href="#individual" role="tab" aria-controls="individual" aria-selected="false">Add Post</a>
                                            </li>
                                          

                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade active show" id="group" role="tabpanel" aria-labelledby="group-tab">
                                                <PostView />
                                            </div>
                                            <div className="tab-pane fade" id="individual" role="tabpanel" aria-labelledby="individual-tab">
                                                <PostAdd />
                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
          </div>
        </div>
        {/* footer! */}

        {/* footer end! */}
      </div>
    </div>
  );
}

export default Post;
