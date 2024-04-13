﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using RSPOCourseWork.Data;

#nullable disable

namespace RSPOCourseWork.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240412080243_Comments")]
    partial class Comments
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AnimeModelCollectionModel", b =>
                {
                    b.Property<string>("animeId")
                        .HasColumnType("text");

                    b.Property<int>("collectionsId")
                        .HasColumnType("integer");

                    b.HasKey("animeId", "collectionsId");

                    b.HasIndex("collectionsId");

                    b.ToTable("AnimeModelCollectionModel");
                });

            modelBuilder.Entity("AnimeModelCommentModel", b =>
                {
                    b.Property<string>("AnimeId")
                        .HasColumnType("text");

                    b.Property<int>("commentsId")
                        .HasColumnType("integer");

                    b.HasKey("AnimeId", "commentsId");

                    b.HasIndex("commentsId");

                    b.ToTable("AnimeModelCommentModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.AnimeModel", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("attributesId")
                        .HasColumnType("integer");

                    b.Property<int>("linksId")
                        .HasColumnType("integer");

                    b.Property<string>("type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("attributesId");

                    b.HasIndex("linksId");

                    b.ToTable("Anime");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.AttributesModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<List<string>>("abbreviatedTitles")
                        .IsRequired()
                        .HasColumnType("text[]");

                    b.Property<string>("ageRating")
                        .HasColumnType("text");

                    b.Property<string>("averageRating")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("canonicalTitle")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("coverImageId")
                        .HasColumnType("integer");

                    b.Property<int>("coverImageTopOffset")
                        .HasColumnType("integer");

                    b.Property<DateTime>("createdAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("endDate")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("episodeCount")
                        .HasColumnType("integer");

                    b.Property<string>("episodeLength")
                        .HasColumnType("text");

                    b.Property<bool>("nsfw")
                        .HasColumnType("boolean");

                    b.Property<int>("popularityRank")
                        .HasColumnType("integer");

                    b.Property<int>("posterImageId")
                        .HasColumnType("integer");

                    b.Property<int>("ratingRank")
                        .HasColumnType("integer");

                    b.Property<string>("showType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("startDate")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("subtype")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("titlesId")
                        .HasColumnType("integer");

                    b.Property<int?>("totalLength")
                        .HasColumnType("integer");

                    b.Property<DateTime>("updatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("userCount")
                        .HasColumnType("integer");

                    b.Property<string>("youtubeVideoId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("coverImageId");

                    b.HasIndex("posterImageId");

                    b.HasIndex("titlesId");

                    b.ToTable("AttributesModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.CollectionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("CollectionImage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CollectionName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("userId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("userId");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.CommentModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CommentModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.CoverImageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("large")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("original")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("small")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("tiny")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("CoverImageModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.LinksModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("first")
                        .HasColumnType("text");

                    b.Property<string>("last")
                        .HasColumnType("text");

                    b.Property<string>("next")
                        .HasColumnType("text");

                    b.Property<string>("related")
                        .HasColumnType("text");

                    b.Property<string>("self")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("LinksModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.PosterImageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("large")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("medium")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("original")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("small")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("tiny")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("PosterImageModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.TitlesModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("en")
                        .HasColumnType("text");

                    b.Property<string>("en_jp")
                        .HasColumnType("text");

                    b.Property<string>("ja_jp")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TitlesModel");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProfileImage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AnimeModelCollectionModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.AnimeModel", null)
                        .WithMany()
                        .HasForeignKey("animeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RSPOCourseWork.Models.CollectionModel", null)
                        .WithMany()
                        .HasForeignKey("collectionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AnimeModelCommentModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.AnimeModel", null)
                        .WithMany()
                        .HasForeignKey("AnimeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RSPOCourseWork.Models.CommentModel", null)
                        .WithMany()
                        .HasForeignKey("commentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RSPOCourseWork.Models.AnimeModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.AttributesModel", "attributes")
                        .WithMany()
                        .HasForeignKey("attributesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RSPOCourseWork.Models.LinksModel", "links")
                        .WithMany()
                        .HasForeignKey("linksId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("attributes");

                    b.Navigation("links");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.AttributesModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.CoverImageModel", "coverImage")
                        .WithMany()
                        .HasForeignKey("coverImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RSPOCourseWork.Models.PosterImageModel", "posterImage")
                        .WithMany()
                        .HasForeignKey("posterImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("RSPOCourseWork.Models.TitlesModel", "titles")
                        .WithMany()
                        .HasForeignKey("titlesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("coverImage");

                    b.Navigation("posterImage");

                    b.Navigation("titles");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.CollectionModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.UserModel", "user")
                        .WithMany("collections")
                        .HasForeignKey("userId");

                    b.Navigation("user");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.CommentModel", b =>
                {
                    b.HasOne("RSPOCourseWork.Models.UserModel", "User")
                        .WithMany("comments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("RSPOCourseWork.Models.UserModel", b =>
                {
                    b.Navigation("collections");

                    b.Navigation("comments");
                });
#pragma warning restore 612, 618
        }
    }
}
