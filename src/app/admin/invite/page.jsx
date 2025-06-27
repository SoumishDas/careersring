"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

export default function InvitePage() {
  const [sending, setSending] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/masterData/invitations")
      .then((res) => setTokens(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async () => {
    setSending(true);
    try {
      const res = await axios.post("/api/masterData/invitations/send");
      setTokens(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button variant="contained" onClick={handleSend} disabled={sending}>
        Send Invitations
      </Button>
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          tokens.map((t) => (
            <Typography key={t.ID}>
              {t.Token} - {t.Completed ? "Completed" : "Pending"}
            </Typography>
          ))
        )}
      </Box>
    </Box>
  );
}
