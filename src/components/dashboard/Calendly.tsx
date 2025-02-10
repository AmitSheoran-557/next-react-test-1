import React, { useEffect } from 'react';

const Calendly = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className="calendly-inline-widget max-w-[450px] mt-20 h-[600px] mx-auto"
                data-url="https://calendly.com/amit22082006/this-is-new-meeting?text_color=8e14de&primary_color=a611ca">
            </div>
        </div>
    );
};

export default Calendly;
