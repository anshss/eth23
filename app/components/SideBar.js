import React from "react";
import styled from "styled-components"

const StyledLink = styled.a`
  color: violet
  text-decoration: none;
  cursor: pointer;
  height:10px;
  background-color: #311432;
  padding: 1cm
`;

const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    background-color: #311432;
    height: 100vh;
`

export default function SideBar () {

    return (<Sidebar className="sidebar">
        <StyledLink className="asd" href="/dashboard/createmodel">Become a Desoite</StyledLink>
        <StyledLink href="/dashboard/fetchmodels">Desoite Details</StyledLink>
        <StyledLink href="/dashboard/createcontent">Desopost</StyledLink>
        <StyledLink href="/notification">push testing</StyledLink>
        <StyledLink href="/dashboard/logout">Become boring</StyledLink>
    </Sidebar>)
}