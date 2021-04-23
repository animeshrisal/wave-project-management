import React, { useState } from "react";

const Card = (values) => {
  return (
    <div class="card">
        <div class="pic">
            <img src ="" alt="Test" />
        </div>
        <div class="team-content">
            <h3 class="title">Toast</h3>
            <span class="">Writer</span>
        </div>
        <ul class="social">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Facebook</a></li>
        </ul>
    </div>
  );
};

export default Card;