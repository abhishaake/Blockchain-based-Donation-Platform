import React, { Component } from "react";
import Web3 from "web3";
import logo from "../logo.png";
import "./App.css";
import Work from "../abis/work.json";
import Navbar from "./Navbar.js";
import Main from "./Main.js";
import Create from "./Create.js";
import Donate from "./Donate.js";

class App extends Component {
  async UNSAFE_componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.eth_requestAccounts;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await window.eth_requestAccounts;
    } else {
      window.alert(
        ""
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Work.networks[networkId];
    if (networkData) {
      const work = web3.eth.Contract(Work.abi, networkData.address);
      this.setState({ work });
      const productCount = await work.methods.pcount().call();
      this.setState({ productCount });-0a
      for (var i = 1; i <= productCount; i++) {
        const product = await work.methods.req(i).call();
        if (product.donation === false) {
          this.setState({
            products: [...this.state.products, product],
          });
        }
      }

      this.setState({ loading: false });
    } else {
      window.alert("Contract Not Deployed");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      pcount: 0,
      products: [],
      loading: true,
    };
    this.createProduct = this.createProduct.bind(this);
    this.buyProduct = this.buyProduct.bind(this);
  }

  createProduct(price, name) {
    this.setState({ loading: true });
    this.state.work.methods
      .create(price, name)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  buyProduct(id, price) {
    this.setState({ loading: true });
    this.state.work.methods
      .donate(id)
      .send({ from: this.state.account, value: price })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }

  render() {

    return (
      <body class="body1">
        <div>
          <Navbar account={this.state.account} />
          <div>
            <form method="get" action="/Create.js">
              <button type="submit"> Create </button>
            </form>
          </div>
          <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="column1">
                {this.state.loading ? (
                  <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <Main
                    products={this.state.products}
                    buyProduct={this.buyProduct}
                  />
                )}
                </div> 
              
                <div class="column2">
                {this.state.loading ? (
                  <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                ) : (
                  <Create
                    products={this.state.products}
                    createProduct={this.createProduct}
                  />
                )}
                </div>
              </main>
            </div>
          </div>
          
        </div>

        <div class="retail-apps charity-apps ad1">
          <div class="container">
            <h2 class="mt-40 temp3">Blockchain for charity: applications</h2>
            <div class="gor-100">
              <div class="h4 ad2">
                Non-profits range from NGOs the size of some governments to
                neighborhood organizations addressing local concerns. But they
                all need to work alongside communities, government, press and
                other charities to achieve their goals. Here are some key ways
                blockchain technology can facilitate that.{" "}
              </div>
            </div>
            <div class="row tiles-label-mini tiles-lable-collapse tiles-lable-retail-apps tiles-lable-charity-apps three-tiles point-list-accordion-plus ">
              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Automate administration</h3>
                  <div class="text">
                    Smart contracts can automate common admin tasks, reducing
                    strain on existing administrative staff and structures{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Share data securely</h3>
                  <div class="text">
                    Reduce data duplication and inaccuracies between
                    organizations: use the same distributed ledger, secure and
                    updated in real time{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Trace individual donations</h3>
                  <div class="text">
                    Blockchain creates a fully auditable chain of giving. Show
                    donors exactly which person their money helped{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Enable transnational donations</h3>
                  <div class="text">
                    Show clearly where each individual donation came from and
                    demonstrate tax and regulatory compliance{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Establish verifiable identity</h3>
                  <div class="text">
                    Blockchain can be a secure repository of verified identity,
                    allowing those without documents to prove who they are{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Accurately target aid</h3>
                  <div class="text">
                    Ensure aid goes to the exact individuals who need it,
                    checking their identities against the blockchain{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Rapidly deliver emergency aid</h3>
                  <div class="text">
                    Cooperate across agencies, geography and political borders
                    to deliver emergency aid cohesively and rapidly{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Donor anonymity</h3>
                  <div class="text">
                    Anonymity correlates with larger donations; digital wallets
                    can allow totally anonymous donations, eliminating ‘donation
                    shaming’{" "}
                  </div>
                </div>
              </div>

              <div class="col-md-4 ad3">
                <div class="tile tile-collapse point-accordion-plus">
                  <h3>Goal-based fundraising</h3>
                  <div class="text">
                    Imitate the success of GoFundMe and Kickstarter
                    goal-oriented crowdfunding, attracting donations for
                    specific goals{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div id="contact" class="container">
        <div class="contact-block ad1">
                                <h2>We’d love to show how blockchain can help your charity institution:</h2>
                    <div role="form" class="wpcf7" id="wpcf7-f4417-o1" lang="en-GB" dir="ltr">
    <div class="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true"></p> <ul></ul></div>
    <form class="fo1">
    <div style={{display: "none"}}>
    <input type="hidden" name="_wpcf7" value="4417"></input>
    <input type="hidden" name="_wpcf7_version" value="5.4.2"></input>
    <input type="hidden" name="_wpcf7_locale" value="en_GB"></input>
    <input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f4417-o1"></input>
    <input type="hidden" name="_wpcf7_container_post" value="0"></input>
    <input type="hidden" name="_wpcf7_posted_data_hash" value=""></input>
    <input type="hidden" name="_wpcf7_recaptcha_response" value=""></input>
    </div>
    <div id="about_form">
    <div class="row">
    <div class="col-md-6">
    <div class="form-row">
    
    <div class="form-row">
    <div class="col-sm-12"> <span class="wpcf7-form-control-wrap your-email"><input type="email" name="your-email" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form-control required" aria-required="true" aria-invalid="false" placeholder="Email"></input></span> </div>
    </div>
    <div class="form-row">
    <div class="col-sm-12"> <span class="wpcf7-form-control-wrap your-company"><input type="text" name="your-company" value="" size="40" class="wpcf7-form-control wpcf7-text form-control" aria-invalid="false" placeholder="Company"></input></span> </div>
    </div>
    <div class="form-row">
    <div class="col-sm-12"> <span class="wpcf7-form-control-wrap your-phone"><input type="tel" name="your-phone" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-tel wpcf7-validates-as-tel form-control" aria-invalid="false" placeholder="Phone"></input></span> </div>
    </div>
    </div>
    <div class="col-md-6">
    <div class="form-row">
    <div class="col-sm-12"> <span class="wpcf7-form-control-wrap your-message"><textarea name="your-message" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required form-control required temp1" aria-required="true" aria-invalid="false" placeholder="Message"></textarea></span> </div>
    </div>
    </div>
    <div class="col-md-12">
    
    <p><input ty pe="submit" value="Send" class="wpcf7-form-control wpcf7-submit temp2  " id="subm" data-nlok-ref-guid="aab0f6db-8f5c-4a62-d77f-74318a6c8354"></input><span class="ajax-loader"></span><span class="ajax-loader"></span><span class="ajax-loader"></span> </p></div>
    </div>
    </div>
    <div class="wpcf7-response-output" aria-hidden="true"></div></div></form></div>    </div>
    </div>


        <footer>
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-12 col-sm-12">
                <ul id="menu-footer" class="menu-footer row">
                  <li
                    id="menu-item-38"
                    class="header-footer col-lg-6 col-md-6 col-sm-6 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-38"
                  >
                    <a>Meet Founders</a>
                    <ul class="sub-menu">
                      <li
                        id="menu-item-33"
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-33"
                      >
                        <a
                          title="E1"
                          href=""
                        >
                         Abhishek Verma 9919102001
                        </a>
                      </li>
                      <li
                        id="menu-item-34"
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-34"
                      >
                        <a
                          title="E1"
                          href=""
                        >
                          Vasu Sharma 9919102003
                        </a>
                      </li>
                      <li
                        id="menu-item-35"
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-35"
                      >
                        <a
                          title="E2"
                          href=""
                        >
                          Yash Verma 9919102020
                        </a>
                      </li>
                      
              
                    </ul>
                  </li>
                  <li
                    id="menu-item-39"
                    class="header-footer col-lg-6 col-md-6 col-sm-6 menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-39"
                  >
                    <a>What We Offer</a>
                    <ul class="sub-menu">
                      <li
                        id="menu-item-71"
                        class="arrow menu-item menu-item-type-post_type menu-item-object-services menu-item-71"
                      >
                        <a
                          title="Blockchain development"
                          href=""
                        >
                          Blockchain development
                        </a>
                      </li>
                      <li
                        id="menu-item-1818"
                        class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1818"
                      >
                        <a
                          title="Blockchain services"
                          href=""
                        >
                          Blockchain services
                        </a>
                      </li>
                      <li
                        id="menu-item-1819"
                        class="menu-item menu-item-type-post_type menu-item-object-page current-page-ancestor menu-item-1819"
                      >
                        <a
                          title="Blockchain solutions"
                          href=""
                        >
                          Blockchain solutions
                        </a>
                      </li>
                      
                    </ul>
                  </li>
                </ul>
              </div>{" "}
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="header">Contacts</div>
                <div class="email subheader" itemscope="">
                  <a href="mailto:" itemprop="email"></a>
                </div>
                <div class="subheader">
                  <div
                    class="footer-contact-info"
                    itemscope=""
                    itemtype="http://schema.org/Organization"
                  >
                    <div itemprop="name">Abhishek Verma</div>
                    <div itemprop="telephone">+91-9795124268</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="header">Follow Us</div>
                <div
                  class="socials"
                  itemscope=""
                  itemtype=""
                >
                  <a
                    itemprop="sameAs"
                    href=""
                    target="_blank"
                  >
                    <svg
                      width="10"
                      height="20"
                      viewBox="0 0 10 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      
                    </svg>
                  </a>
                  <a
                    itemprop="sameAs"
                    href=""
                    target="_blank"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns=""
                    >
                      <path
                        d="M1.92306 0C2.98319 0 3.84475 0.863035 3.84475 1.92534C3.84475 2.9885 2.98337 3.85154 1.92323 3.85154C0.860176 3.85154 0 2.9885 0 1.92534C0.0001719 0.863207 0.860348 0 1.92306 0ZM0.264432 5.31255H3.58049V16H0.264432V5.31255ZM12.0224 5.0468C15.3802 5.0468 16 7.26028 16 10.1377V15.9997H12.6864V10.8022C12.6864 9.56297 12.6637 7.96883 10.9632 7.96883C9.23808 7.96883 8.97313 9.31892 8.97313 10.7128V15.9998H5.66V5.31255H5.66018H8.84058V6.77287H8.88494C9.32766 5.93275 10.4093 5.0468 12.0224 5.0468Z"
                        fill="#1F2432"
                      ></path>
                    </svg>
                  </a>
                  <a
                    itemprop="sameAs"
                    href=""
                    target="_blank"
                  >
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9766 1.94911C19.948 1.91516 19.9007 1.90364 19.8603 1.92216C19.2624 2.18861 18.6333 2.38017 17.9854 2.49333C18.6733 1.9736 19.1858 1.25387 19.4486 0.428586C19.4613 0.389082 19.4482 0.345873 19.416 0.320154C19.3836 0.294434 19.3388 0.291143 19.3033 0.312335C18.5286 0.773842 17.6896 1.09914 16.8084 1.27959C16.0275 0.465622 14.9372 0 13.8087 0C11.5137 0 9.64679 1.87525 9.64679 4.18031C9.64679 4.45911 9.67362 4.73523 9.72688 5.00333C6.54817 4.80621 3.57595 3.27334 1.555 0.783512C1.53431 0.757998 1.50297 0.743802 1.4702 0.747094C1.43763 0.749563 1.40854 0.76808 1.39215 0.796269C1.02344 1.43164 0.82864 2.15857 0.82864 2.89805C0.82864 4.17969 1.40834 5.37801 2.39546 6.16872C1.88725 6.1074 1.39093 5.94671 0.943351 5.69713C0.91324 5.68005 0.875753 5.68026 0.845642 5.69775C0.815531 5.71503 0.796481 5.74713 0.795662 5.78211L0.795251 5.8356C0.795251 7.67628 2.00278 9.29248 3.72077 9.82909C3.26828 9.90233 2.79879 9.8974 2.33728 9.80892C2.30328 9.80254 2.26764 9.81427 2.24429 9.84061C2.22114 9.86695 2.21336 9.90378 2.22401 9.93711C2.73918 11.5523 4.1706 12.685 5.83677 12.8261C4.44693 13.8489 2.80411 14.3878 1.0683 14.3878C0.748548 14.3878 0.42654 14.3686 0.111087 14.3314C0.0660225 14.3263 0.0213677 14.3532 0.00579986 14.3966C-0.00976798 14.4405 0.00682367 14.4894 0.0457432 14.5143C1.92412 15.7244 4.09604 16.3636 6.32695 16.3636C13.6244 16.3636 17.985 10.4095 17.985 4.65334C17.985 4.49305 17.9819 4.3336 17.9756 4.17455C18.7628 3.59617 19.4385 2.88817 19.9834 2.06865C20.0078 2.03203 20.0051 1.98327 19.9766 1.94911Z"
                        fill="#1F2432"
                      ></path>
                    </svg>
                  </a>
                  <a
                    itemprop="sameAs"
                    href="https://www.youtube.com/channel/UCZHkjzM5Vp5RH0H_XGBtS0g"
                    target="_blank"
                  >
                    <svg
                      width="24"
                      height="17"
                      viewBox="0 0 24 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M23.4984 2.62314C24 4.49498 24 8.39985 24 8.39985C24 8.39985 24 12.3049 23.4984 14.1766C23.2224 15.209 22.4093 16.0225 21.3767 16.2983C19.505 16.7999 11.9999 16.7999 11.9999 16.7999C11.9999 16.7999 4.49497 16.7999 2.62334 16.2983C1.59071 16.0225 0.777578 15.209 0.501593 14.1766C0 12.3049 0 8.39985 0 8.39985C0 8.39985 0 4.49498 0.501593 2.62314C0.777578 1.59072 1.59071 0.77738 2.62334 0.501395C4.49497 -5.00676e-08 11.9999 0 11.9999 0C11.9999 0 19.505 -5.00676e-08 21.3767 0.501395C22.4093 0.77738 23.2224 1.59072 23.4984 2.62314ZM9.6 11.9999L15.835 8.40005L9.6 4.7998V11.9999Z"
                        fill="#1F2432"
                      ></path>
                    </svg>
                  </a>
                  <link
                    itemprop="url"
                    href=""
                  ></link>
                </div>
                <div class="copyright">
                  JIIT. All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </footer>
        </body>
    );
  }
}

export default App;
