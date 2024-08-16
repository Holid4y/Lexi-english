}, [dispatch]);

// Other useEffect hooks for theme and keydown handling

return (
    <div>
        <ConditionalNavigation />
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/change-pass" element={<ChangePass />} />
            <Route path="/forgot-password/:uid/:token" element={<ForgotPass />} />
            <Route path="/send-reset-password" element={<SendResetPassword />} />
            <Route path="/change-email" element={<ChangeEmail />} />
            <Route path="/activation/:uid/:token" element={<ActivationEmail />} />
            
            <Route path="/books" element={<BookList />} />
            <Route path="/book/:slug/:page" element={<BookRetrieve />} />
            <Route path="/bookmarks" element={<BookmarkList />} />
            <Route path="/my-books" element={<MyBookList />} />

            <Route path="/training/recognize" element={<Recognize />} />
            <Route path="/training/reproduce" element={<Reproduce />} />
            <Route path="/training" element={<Training />} />

            <Route path="/word-list" element={<WordList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/level-settings" element={<LevelSettings />} />
            <Route path="/landing" element={<LandingMain />} />
            {/* Другие маршруты */}
        </Routes>
    </div>
);
}

function ConditionalNavigation() {
const location = useLocation();
const hideNavigationPaths = ["/login", "/register", "/landing", "/forgot-password", "/send-reset-password"]; // пути, на которых не нужно показывать навигацию

return hideNavigationPaths.includes(location.pathname) ? null : <Navigation />;
}

export default App;