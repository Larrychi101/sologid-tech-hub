import React from 'react';
import customLogo from '../assets/images/sologidlogo.png'; // Adjust the path as necessary

export const SologidLogo = () => (
  <img
	src={customLogo}
	alt="Sologid Logo"
	width="40"
	height="40"
	className="fill-primaryColor"
  />
);