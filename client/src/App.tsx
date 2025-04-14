import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Research from "@/pages/Research";
import Contact from "@/pages/Contact";
import SubmitResearch from "@/pages/SubmitResearch";
import ViewResearchPaper from "@/pages/ViewResearchPaper";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/courses" component={Courses} />
          <Route path="/research" component={Research} />
          <Route path="/submit-research" component={SubmitResearch} />
          <Route path="/research/paper/:id" component={ViewResearchPaper} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
