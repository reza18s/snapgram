import { Route, Routes } from "react-router";
import Home from "./_Root/pages/Home";
import SignInForm from "./_auth/SignInForm";
import SignupForm from "./_auth/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_Root/RootLayout";
import { Toaster } from "react-hot-toast";
import Saved from "./_Root/pages/Saved";
import CreatePost from "./_Root/Posts/CreatePost";
import AllUsers from "./_Root/pages/AllUsers";
import EditPost from "./_Root/Posts/EditPost";
import Profile from "./_Root/pages/Profile";
import PostDetails from "./_Root/pages/PostDetails";
import UpdateProfile from "./_Root/pages/UpdateProfile";
import Explore from "./_Root/pages/Explore";

function App() {
  return (
    <main className="flex">
      <Routes>
        <Route element={<AuthLayout></AuthLayout>}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>
        <Route element={<RootLayout></RootLayout>}>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="explore" element={<Explore />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#2B2A4C",
            color: "white",
          },
        }}
      />
    </main>
  );
}

export default App;
