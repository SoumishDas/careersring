"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
} from "@mui/material";

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          `/api/candidates?page=${currentPage}&search=${search}`,
        );
        setCandidates(response.data);
        const totalPagesResponse = await axios.get(
          `/api/candidate/numPages?pageSize=10&search=${search}`,
        );
        setTotalPages(totalPagesResponse.data.numberOfPages);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };
    fetchCandidates();
  }, [currentPage, search]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {candidates &&
          candidates.length > 0 &&
          candidates.map((candidate) => (
            <Card key={candidate.ID} sx={{ margin: "1rem" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {candidate.FullName}
                </Typography>
                <Typography
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  <div>{candidate.ProfessionalSummary}</div>
                  <div>
                    <Typography variant="h5" margin={"1rem"}>
                      Skills:
                    </Typography>
                    <ul>
                      {candidate.Skills.map((skill) => (
                        <li key={skill.ID}>{skill.Skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Typography>Job Experience:</Typography>
                    <ul>
                      {candidate.PreviousJobs.map((experience) => (
                        <li key={experience.ID}>
                          {experience.Title} at {experience.Company} from{" "}
                          {experience.StartDate} to {experience.EndDate}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Typography>
                <Link href={`/candidate/${candidate.ID}`}>
                  <Button variant="contained">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {currentPage > 3 && (
          <>
            <Button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              1
            </Button>
            <span>...</span>
          </>
        )}

        {Array.from({ length: 3 }, (_, index) => {
          const page = currentPage - 1 + index;
          return page > 1 && page < totalPages ? (
            <Button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </Button>
          ) : null;
        })}

        {currentPage < totalPages - 2 && (
          <>
            <span>...</span>
            <Button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              {totalPages}
            </Button>
          </>
        )}

        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => handlePageChange(Number(e.target.value))}
          style={{ width: "50px", marginLeft: "10px" }}
        />
      </Box>
    </Box>
  );
}
