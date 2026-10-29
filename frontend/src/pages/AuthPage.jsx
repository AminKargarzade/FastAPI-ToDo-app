const AuthPage = () => {
  return (
    // Main page wrapper
    <main>
      {/* Card container */}
      <div>
        {/* Left side */}
        <div>
          {/* Form wrapper */}
          <form action="">
            <h2>Log in to your account</h2>
            <p>We're happy to see you again!</p>

            {/* Username section */}
            <div>
              <label>Username</label>
              <div>
                {/* Username icon */}
                <span></span>
                <input type="text" placeholder="Enter your username" />
              </div>
            </div>

            {/* Password section */}
            <div>
              <label>Password</label>
              <div>
                {/* Password icon */}
                <span></span>
                <input type="password" placeholder="Enter your password" />
                {/* Eye icon */}
                <button type="button"></button>
              </div>
            </div>

            {/* Action button */}
            <button type="submit">Log in</button>
            <p>
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </div>

        {/* Right side */}
        <section>
          <h1>Welcome back!</h1>
          <p>Log in to continue your journey and get things done</p>
          <img src="" alt="" />
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
