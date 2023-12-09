import React from "react";
import styled from "styled-components";

const Navbar = styled.div`
  background-color: #311432; /* Your desired purple color */
  padding: 1em;
  color: white;
  display: flex;
  justify-content: center;
`;

export default function NavBar() {
  return (
    <Navbar className="navbar">
      {/* Wrap your content in another element with the desired style */}
      <div>NavBar</div>
    </Navbar>
  );
}
