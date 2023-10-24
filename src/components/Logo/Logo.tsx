import React from 'react';
import LogoImage from '../../assets/images/logo.png';
import styles from './Logo.module.css';

type Props = {
    onPress?: () => void;
}

export default function Logo({onPress}: Props) {
	return (
		<img
			onClick={onPress}
			className={styles.container}
			src={LogoImage} /> 
	);
}