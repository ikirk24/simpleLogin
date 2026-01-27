import React, { useEffect, useState } from 'react';
import UserForm from '../../components/userForm';

export default function Login() {

    return (
        <div className = "wrapper">
            <UserForm mode="login"/>
        </div>
    )
}
