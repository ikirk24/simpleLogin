import React, { useEffect, useState } from 'react';
import UserForm from '../../components/userForm';

export default function Signup() {

    return (
        <div className = "wrapper">
            <UserForm mode="signup"/>
        </div>
    )
}