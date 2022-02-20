import logo from './logo.svg';
import Navbar from './components/navbar';
import EventCard from './components/eventCard';
import ProfileCard from './components/profileCard';
import { Container, Button, MenuItem, VStack, StackDivider, Text, Box, Menu, MenuButton, MenuList, HStack, Flex, Center, Square } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import Events from './pages/events';
import Login from './pages/login';
import Register from './pages/register';
import CreateEvent from './pages/createEvent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/createevent" element={<CreateEvent/>} />
      </Routes>
    </>
  );
}

export default App;
