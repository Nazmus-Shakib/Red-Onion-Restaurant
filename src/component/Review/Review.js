import React from "react";
import "./Review.css";

const Review = () => {
  return (
    <section className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-md-9">
                <h2>Why you choose us</h2>
                <p className="mt-3 mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
                  sapiente eaque repellendus asperiores nisi! Architecto,
                  praesentium eligendi consequatur inventore fuga eius totam
                  officia adipisci. Nostrum quia soluta vel distinctio delectus!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="imgContainer col-md-12">
        <div className="col-md-4 mb-3">
          <div class="card">
            <img
              src="https://i.ibb.co/nfYS8tN/adult-blur-blurred-background-687824.png"
              class="card-img-top"
              alt="..."
            ></img>
            <div class="card-body">
              <div className="d-flex">
                <img
                  className="mr-2"
                  height="40px"
                  src="https://i.ibb.co/K5jRFCf/Group-204.png"
                  alt=""
                />

                <div>
                  <h5>Quick Delivery</h5>
                  <p>
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div class="card">
            <img
              src="https://i.ibb.co/pXWG2f1/chef-cook-food-33614.png"
              class="card-img-top"
              alt="..."
            ></img>
            <div class="card-body">
              <div className="d-flex">
                <img
                  className="mr-2"
                  height="40px"
                  src="https://i.ibb.co/s1QdHLh/Group-1133.png"
                  alt=""
                />

                <div>
                  <h5 class="card-title">A Good Auto Responder</h5>
                  <p class="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 ">
          <div class="card">
            <img
              src="https://i.ibb.co/7Smb8fJ/architecture-building-city-2047397.png"
              class="card-img-top"
              alt="..."
            ></img>
            <div class="card-body">
              <div className="d-flex">
                <img
                  className="mr-2"
                  height="40px"
                  src="https://i.ibb.co/CpGRBmR/Group-245.png"
                  alt=""
                />

                <div>
                  <h5 class="card-title">Home Delivery</h5>
                  <p class="card-text">
                    This card has supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
