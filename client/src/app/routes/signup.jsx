import React, { useEffect, useState } from 'react';
import UserForm from '../../components/UserForm';

export default function Signup() {

    return (
        <div className = "wrapper">
            <UserForm mode="signup"/>
        </div>
    )
}