import React from 'react';
import styles from './Avatar.module.css';
import AvatarImage from '../../assets/images/avatar-1.png';

type Props = {
    avatarUri?: string,
    style?: React.CSSProperties,
}

export default function Avatar({avatarUri}: Props) {
	return (
		<img
			src={avatarUri || AvatarImage}
			className={styles.container}
			style={styles}
		/>
	);
}